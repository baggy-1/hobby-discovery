import { css } from "@emotion/react";
import { borderRadius, Text } from "components/common/styles";
import { MAIN_COLOR, mq } from "config/styles";
import useFadeIn from "hooks/useFadeIn";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRef } from "react";
import addRef from "util/addRef";

const HobbySection = () => {
  const router = useRouter();
  const refArr = useRef<HTMLDivElement[]>([]);
  useFadeIn(refArr.current, 200);

  return (
    <>
      <section css={section}>
        <div css={wrapper}>
          <div css={titleBox}>
            <h1 css={[Text("2.2rem", "700", MAIN_COLOR), title]}>
              <span css={TextSet}>
                한 달을 즐겁게 보낼 수 있는
                <br />
                가장 쉬운 방법
              </span>
            </h1>
          </div>
          <div css={imageWrapper}>
            <div css={imageBox}>
              <Image
                src={`/asset/image/sub/sub-desc-1.jpg`}
                alt="description-chiham"
                width={800}
                height={500}
                css={borderRadius("0.5rem")}
              />
            </div>
          </div>
          <div css={descSection}>
            <div css={descWrapper("origin")} ref={addRef(refArr, 0)}>
              <div css={IconBox}>
                <Image
                  src={`/asset/image/sub/stop-icon.jpg`}
                  alt={"stop"}
                  width={300}
                  height={300}
                />
              </div>
              <div css={TextBox}>
                <h1 css={C_text}>
                  언제든지 구독하고 <br />
                  해지할 수 있어요
                </h1>
                <h2 css={Text("1.5rem", "700", "#999999")}>
                  결제 하기 전이라면, 원하는 날짜에
                  <br />
                  구독하고 해지 가능해요
                </h2>
              </div>
            </div>
            <div css={descWrapper("reverse")} ref={addRef(refArr, 1)}>
              <div css={TextBox}>
                <h1 css={C_text}>
                  매달, 다른 테마 박스로
                  <br />
                  즐거운 시간을 보내요
                </h1>
                <h2 css={Text("1.5rem", "700", "#999999")}>
                  구독자님들의 피드백을 바탕으로
                  <br />
                  매달 다른 테마의 박스를 구성해요
                </h2>
              </div>
              <div css={IconBox}>
                <Image
                  src={`/asset/image/sub/box-icon.png`}
                  alt={"box"}
                  width={300}
                  height={300}
                />
              </div>
            </div>
            <div css={descWrapper("origin")} ref={addRef(refArr, 2)}>
              <div css={IconBox}>
                <Image
                  src={`/asset/image/sub/delivery-icon.png`}
                  alt={"delivery"}
                  width={300}
                  height={300}
                />
              </div>
              <div css={TextBox}>
                <h1 css={C_text}>
                  집 앞까지 안전하게 배송해요
                  <br />
                  당연히, 무료!
                </h1>
                <h2 css={Text("1.5rem", "700", "#999999")}>
                  구독을 시작하면, 신경쓰지 않아도
                  <br />문 앞에서 만나볼 수 있어요
                </h2>
              </div>
            </div>
            <div css={descWrapper("origin")} ref={addRef(refArr, 3)}>
              <div css={TextBox}>
                <div
                  css={[Button]}
                  onClick={() => router.push("/subscription")}
                >
                  지금 바로 구독하기
                </div>
              </div>
              <div css={IconBox}>
                <Image
                  src={`/asset/image/sub/click-icon.jpg`}
                  alt={`click`}
                  width={300}
                  height={300}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HobbySection;

const C_text = css({
  fontSize: "3rem",
  fontWeight: "700",
  color: MAIN_COLOR,
  [mq[2]]: {
    fontSize: "2.5rem",
  },
});

const Button = css({
  width: "14rem",
  height: "4rem",
  backgroundColor: MAIN_COLOR,
  color: "white",
  borderRadius: "0.5rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  fontSize: "1.25rem",
  fontWeight: "700",
});

const descSection = css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "20rem",
  width: "100%",
  maxWidth: "80rem",
  [mq[2]]: {
    gap: "10rem",
  },
});

const TextSet = css({
  wordBreak: "keep-all",
  fontSize: "3rem",
  [mq[1]]: {
    fontSize: "1.7rem",
  },
});

const TextBox = css({
  wordBreak: "keep-all",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",
  gap: "1rem",
  [mq[1]]: {
    fontSize: "1.5rem",
  },
});

const IconBox = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",
  marginBottom: "1rem",
  [mq[1]]: {
    width: "80%",
    height: "80%",
  },
});

const descWrapper = (type: "origin" | "reverse") =>
  css({
    opacity: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    width: "100%",
    [mq[2]]: {
      flexDirection: type === "reverse" ? "column-reverse" : "column",
      gap: "2rem",
    },
  });

const title = css({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.5rem",
  textAlign: "center",
  [mq[0]]: {
    flexDirection: "column",
    gap: "0",
  },
});

const imageWrapper = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "2rem",
  marginBottom: "10rem",
  [mq[2]]: {
    marginBottom: "5rem",
  },
});

const titleBox = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "3rem",
  letterSpacing: "0.1rem",
  margin: "4rem 0",
  [mq[1]]: {
    margin: "2rem 0",
  },
});

const imageBox = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",
  maxWidth: "1000px",
  maxHeight: "700px",
  borderRadius: "0.5rem",
});

const wrapper = css({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "1rem",
});

const section = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",
  padding: "2rem 0",
});
