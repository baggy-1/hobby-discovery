import { css } from "@emotion/react";
import { Text } from "components/common/styles";
import { authInstance } from "config/instance";
import { mq } from "config/styles";
import useInput from "hooks/useInput";
import useUser from "hooks/useUser";
import Close from "public/asset/svg/Close";
import Star from "public/asset/svg/Star";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { changeOverflowHtml } from "util/changeOverflowHtml";

interface Props {
  prodId: string;
  onClickClose: () => void;
}

const ReviewPostModal = ({ prodId, onClickClose }: Props) => {
  const { user } = useUser();
  const [notice, setNotice] = useState("");
  const [formData, setFormData] = useState<FormData | null>(null);
  const [fileName, setFileName] = useState("");
  const [grade, setGrade] = useState(0);
  const inputTitle = useInput();
  const inputContent = useInput();

  const StarComponent = (width: number, height: number) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <div key={index} onClick={() => setGrade(index + 1)}>
          <Star isTarget={index < grade} width={width} height={height} />
        </div>
      ));
  };

  // handler
  const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.currentTarget;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      formData?.append("profile", files[0]);

      setFileName(files[0].name);
    }
  };

  const onSubmitPostReview = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user) return;
    if (!formData) return;

    if (grade === 0) {
      setNotice("평점을 매겨주세요.");
      return;
    }

    if (!inputTitle.value) {
      setNotice("제목을 작성해주세요.");
      return;
    }

    if (!inputContent.value) {
      setNotice("내용을 작성해주세요.");
      return;
    }

    formData.append("title", inputTitle.value);
    formData.append("body", inputContent.value);
    formData.append("grade", grade.toString());
    formData.append("user", user.id.toString());

    try {
      authInstance.post(`/main/review/`, formData).then((res) => {
        setNotice("리뷰가 등록되었습니다.");
        setTimeout(() => {
          onClickClose();
        }, 1000);
      });
    } catch (error) {
      throw new Error(`error: ${error}`);
    }
  };

  // useEffect
  useEffect(() => {
    changeOverflowHtml("open");

    return () => {
      changeOverflowHtml("close");
    };
  }, []);

  useEffect(() => {
    const data = new FormData();
    setFormData(data);
  }, []);

  return (
    <>
      <div css={section}>
        <div css={section} onClick={onClickClose}></div>
        <div css={alertWrapper}>
          <div css={close} onClick={onClickClose}>
            <Close />
          </div>
          <form css={Form} onSubmit={onSubmitPostReview}>
            <h1 css={Text("1.5rem", "700", "#999999")}>후기 작성</h1>
            <div>{notice}</div>
            <div css={StarsPc}>{StarComponent(60, 60)}</div>
            <div css={StarsMob}>{StarComponent(40, 40)}</div>
            <input
              css={InputTitle}
              type="text"
              placeholder="제목"
              value={inputTitle.value}
              onChange={inputTitle.onChange}
            />
            <textarea
              css={InputContent}
              placeholder="내용"
              value={inputContent.value}
              onChange={inputContent.onChange}
            />
            <label htmlFor="file" css={InputFileBox}>
              <div css={FileTextLabel}>이미지 추가하기 +</div>
              <div css={[Text("1rem", "400", "#999999"), FileText("pc")]}>
                {fileName.length >= 30
                  ? `${fileName.slice(0, 30)}...`
                  : fileName}
              </div>
              <div css={[Text("1rem", "400", "#999999"), FileText("mob")]}>
                {fileName.length >= 10
                  ? `${fileName.slice(0, 10)}...`
                  : fileName}
              </div>
            </label>
            <input type="file" id="file" hidden onChange={onChangeFile} />
            <button css={SubmitButton} type="submit">
              확인
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ReviewPostModal;

const SubmitButton = css({
  width: "100%",
  height: "3.5rem",
  borderTop: "1px solid #e5e5e5",
  fontSize: "1.25rem",
  fontWeight: "700",
});

const FileText = (type: "pc" | "mob") =>
  css(
    type === "pc"
      ? {
          display: "flex",
          [mq[1]]: {
            display: "none",
          },
        }
      : {
          display: "none",
          [mq[1]]: {
            display: "flex",
          },
        }
  );

const FileTextLabel = css({
  color: "#999999",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "8rem",
  height: "2rem",
  border: "1px solid #999999",
  borderRadius: "0.5rem",
  fontWeight: "600",
  [mq[1]]: {
    fontSize: "0.7rem",
    width: "6rem",
  },
});

const InputFileBox = css({
  width: "100%",
  height: "3rem",
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
  gap: "1rem",
});

const InputContent = css({
  width: "100%",
  height: "10rem",
  border: "1px solid #999999",
  borderRadius: "0.5rem",
  padding: "1rem",
  outline: "none",
});

const InputTitle = css({
  width: "100%",
  height: "3rem",
  padding: "0 1rem",
  borderBottom: "1px solid #999999",
  outline: "none",
});

const Form = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "80%",
  height: "100%",
  gap: "1rem",
});

const StarsMob = css({
  display: "none",
  justifyContent: "center",
  alignItems: "center",
  [mq[1]]: {
    display: "flex",
  },
});

const StarsPc = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  [mq[1]]: {
    display: "none",
  },
});

const close = css({
  position: "absolute",
  top: "1rem",
  right: "1rem",
  cursor: "pointer",
  width: "2rem",
  height: "2rem",
});

const textBox = css({
  width: "100%",
  height: "auto",
  minHeight: "7rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "1rem",
  fontWeight: "700",
  color: "#000000",
});

const alertWrapper = css({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  height: "auto",
  minHeight: "10rem",
  backgroundColor: "#fff",
  borderRadius: "0.5rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  boxShadow: "0 0 0.5rem rgba(0, 0, 0, 0.25)",
  zIndex: "999",
  padding: "1rem",
  maxWidth: "40rem",
  [mq[1]]: {
    width: "90%",
  },
});

const section = css({
  width: "100%",
  height: "100%",
  position: "fixed",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: "998",
  top: "0",
  left: "0",
});
