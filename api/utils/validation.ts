import * as Yup from "yup";

// Ülke kodları doğrulama için ek kural

export const registerSchema = Yup.object().shape({
  fullName: Yup.string()
    .required("Ad soyad zorunludur")
    .min(2, "Ad soyad en az 2 karakter olmalıdır")
    .max(100, "Ad soyad en fazla 100 karakter olmalıdır"),

  countryCode: Yup.string().required("Ülke kodu zorunludur"),

  phoneNumber: Yup.string()
    .matches(
      /^\(?\d{3}\)?\s?\d{3}\s?\d{2}\s?\d{2}$/,
      "Geçerli bir telefon numarası girin"
    )
    .required("Telefon numarası zorunludur"),

  email: Yup.string()
    .email("Geçerli bir e-posta adresi girin")
    .required("E-posta adresi zorunludur"),

  terms: Yup.boolean().oneOf([true], "Şartlar ve Koşullar zorunludur"),
});

export const loginSchema = Yup.object().shape({

  email: Yup.string()
    .email("Geçerli bir e-posta adresi girin")
    .required("E-posta adresi zorunludur"),

  password: Yup.string().required("Şifre zorunludur"),

});

export const updateSchema = Yup.object().shape({

  email: Yup.string()
    .email("Geçerli bir e-posta adresi girin")
    .required("E-posta adresi zorunludur"),

});
