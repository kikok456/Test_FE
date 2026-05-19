import Content from "../componen/content";

type Props = {
  isLogin: boolean;
  status: string;
};


export default function Home({ isLogin, status, }: Props) {
  return (
    <>
      <div className="container-2">
        <p className="container-2-text">
          <Content
            isLogin={isLogin}
            status={status}
          />
        </p>
      </div>
    </>
  );
}
