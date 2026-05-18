import Content from "../componen/content";

type Props = {
  isLogin: boolean;
};


export default function Home({ isLogin }: Props) {
  return (
    <>
      <div className="container-2">
        <p className="container-2-text">
          <Content isLogin={isLogin} />
        </p>
      </div>
    </>
  );
}
