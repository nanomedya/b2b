"use client";
import React, { useState, useCallback } from "react";
import * as Yup from "yup";
import {Link} from "@heroui/link";
import {Input} from "@heroui/input";
import {Button, ButtonGroup} from "@heroui/button";
import {Divider} from "@heroui/divider";
import { Eye, EyeOff } from "react-feather";

import { loginSchema } from "@/api/utils/validation";
import { login } from "@/api/services/authService";
import { useMyAlert } from "@/context/MyAlertContext";
import { useAuth } from "@/context/AuthContext";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { setCurrentBasket } from "@/redux/basketSlice";

interface BoxProps {
  title: string;
}

const LoginBox: React.FC<BoxProps> = ({ title }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { showAlert } = useMyAlert();
  const { setUser, setToken, setCurrentBasketId } = useAuth();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = useCallback(() => {
    setIsVisible((prev) => !prev);
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setFormData((prev) => ({ ...prev, [name]: value.trim() }));
    },
    []
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({ email: "", password: "" });
    setIsLoading(true);

    try {
      await loginSchema.validate(formData, { abortEarly: false });

      const response = await login(formData);

      if (response?.statu) {
        const { access_token: token, user } = response;
        setToken(token);
        setUser(user);
        setCurrentBasketId(Number(user.basket_id));
        dispatch(setCurrentBasket({ token, basketId: user.basket_id }));
      } else {
        showAlert("Opss..", response.message || "Giriş başarısız.");
      }
    } catch (err: any) {
      if (err instanceof Yup.ValidationError) {
        const validationErrors = { email: "", password: "" };
        err.inner.forEach((e) => {
          if (e.path && e.path in validationErrors) {
            validationErrors[e.path as "email" | "password"] = e.message;
          }
        });
        setErrors(validationErrors);
      } else {
        console.error("Hata:", err.message);
        showAlert("Hata", err?"Kullanıcı Adı ve/veya şifre yanlış":"");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {title && <h2 className="text-lg font-semibold text-black mb-4">{title}</h2>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Email */}
        <Input
          isClearable
          name="email"
          label="Email"
          variant="bordered"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email adresinizi girin"
        />
        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}

        {/* Password */}
        <Input
          name="password"
          label="Şifreniz"
          variant="bordered"
          value={formData.password}
          onChange={handleChange}
          placeholder="Şifrenizi girin"
          type={isVisible ? "text" : "password"}
          endContent={
            <button
              type="button"
              onClick={toggleVisibility}
              className="focus:outline-none"
              aria-label="Şifreyi göster/gizle"
            >
              {isVisible ? (
                <EyeOff className="text-xl text-default-400" aria-hidden="true" />
              ) : (
                <Eye className="text-xl text-default-400" aria-hidden="true" />
              )}
            </button>
          }
        />
        {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}

        {/* Submit */}
        <Button
          className="bg-black/80 text-white"
          type="submit"
          fullWidth
          isDisabled={isLoading}
        >
          {isLoading ? "Lütfen Bekleyin..." : "Giriş Yap"}
        </Button>

        <Divider className="my-5 bg-gray-100" />

        <div className="text-center">
          <Link
            href="/auth/forgot-password"
            className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400"
          >
            Şifremi unuttum?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginBox;
