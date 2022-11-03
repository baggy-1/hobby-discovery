import { css } from "@emotion/react";
import { borderRadius, Text } from "components/common/styles";
import { MAIN_COLOR, mq } from "config/styles";
import Image from "next/image";
import { useRouter } from "next/router";

const HobbySection = () => {
  const router = useRouter();

  return (
    <>
      <div css={topSection}>
        <div css={topWrapper}>
          <div css={textBox}>
            인테리어 소품부터 실제 사용 가능한 키트까지
            <br />
            다양한 키트를 받아보세요
          </div>
        </div>
      </div>
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
            <div css={descWrapper}>
              <div css={IconBox}>
                <Image
                  src={`/asset/image/sub/stop-icon.jpg`}
                  alt={"stop"}
                  width={150}
                  height={150}
                />
              </div>
              <div css={TextBox}>
                <h1 css={Text("1.8rem", "700", MAIN_COLOR)}>
                  언제든지 구독하고 <br css={Br} />
                  해지할 수 있어요
                </h1>
                <h2 css={Text("1.5rem", "700", "#999999")}>
                  결제 하기 전이라면, 원하는 날짜에
                  <br />
                  구독하고 해지 가능해요
                </h2>
              </div>
            </div>
            <div css={descWrapper}>
              <div css={IconBox}>
                <Image
                  src={`/asset/image/sub/box-icon.png`}
                  alt={"box"}
                  width={150}
                  height={150}
                />
              </div>
              <div css={TextBox}>
                <h1 css={Text("1.8rem", "700", MAIN_COLOR)}>
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
            </div>
            <div css={descWrapper}>
              <div css={IconBox}>
                <Image
                  src={`/asset/image/sub/delivery-icon.png`}
                  alt={"delivery"}
                  width={150}
                  height={150}
                />
              </div>
              <div css={TextBox}>
                <h1 css={Text("1.8rem", "700", MAIN_COLOR)}>
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
            <div css={BottomButton}>
              <div css={Button} onClick={() => router.push("/subscription")}>
                지금 바로 구독하기
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HobbySection;
const Button = css({
  width: "14rem",
  height: "3rem",
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

const BottomButton = css({
  width: "100%",
  height: "5rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const descSection = css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "4rem",
});

const Br = css({
  display: "none",
  [mq[1]]: {
    display: "block",
  },
});

const TextSet = css({
  wordBreak: "keep-all",
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

const descWrapper = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  textAlign: "center",
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

const textBox = css({
  padding: "5rem",
  fontWeight: "700",
  fontSize: "2.4rem",
  width: "100%",
  height: "auto",
  wordBreak: "keep-all",
  [mq[2]]: {
    padding: "2rem",
    fontSize: "1.8rem",
  },
});

const topWrapper = css({
  width: "100%",
  maxWidth: "80rem",
});

const topSection = css({
  width: "100%",
  height: "auto",
  display: "flex",
  justifyContent: "center",
});
