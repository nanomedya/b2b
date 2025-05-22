import LoginBox from "./LoginBox";

export default function HomeGuest(): JSX.Element {
  return (

    <div className="w-full h-[700px] flex flex-col gap-10 flex-wrap justify-center items-center">
      <h1 className="text-xl md:text-3xl text-black font-bold text-center">PintegB2B ile Dilediğin Yedek Parça Burada</h1>
      <div className="bg-white min-w-[340px] p-3 rounded-lg shadow-md">
        <LoginBox title="Giriş yap" />
      </div>
    </div>
  )
}