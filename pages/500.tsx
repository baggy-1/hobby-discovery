import Error from "components/common/Error";

const ErrorPage = () => {
  return (
    <Error
      title={"500"}
      description={"알 수 없는 에러가 발생했어요"}
      path={"/store"}
    />
  );
};

export default ErrorPage;
