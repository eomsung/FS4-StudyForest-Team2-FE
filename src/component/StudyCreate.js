import { useState } from "react";
import { createStudyGroup } from "../api/studyService";
import { useNavigate } from "react-router-dom";
import "./StudyCreate.css";
import BackgroundOption from "./BackgroundOption";
import pwIconOn from "./../img/btn_visibility_on.png";
import pwIconOff from "./../img/btn_visibility_off.png";

function StudyCreate() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nickname: "",
    studyname: "",
    description: "",
    img: "",
    password: "",
    passwordConfirm: "",
  });
  const [errors, setErrors] = useState({
    nickname: "",
    studyname: "",
    description: "",
    img: "",
    password: "",
    passwordConfirm: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const validateField = (name, value) => {
    switch (name) {
      case "nickname":
        if (!value) return "닉네임을 입력해주세요";
        return "";
      case "studyname":
        if (!value) return "스터디 이름을 입력해주세요";
        return "";
      case "description":
        if (!value) return "소개를 입력해주세요";
        return "";
      case "img":
        if (!value) return "배경을 선택해주세요";
        return "";
      case "password":
        if (!value) return "비밀번호를 입력해주세요";
        return "";
      case "passwordConfirm":
        if (!value) return "비밀번호를 다시 한번 입력해주세요.";
        if (formData.password !== value) return "비밀번호가 일치하지 않습니다.";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    const errorMsg = validateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMsg,
    }));
  };

  const handlePasswordToggle = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    try {
      // 모든 필드 검증
      Object.keys(formData).forEach((key) => {
        const errorMsg = validateField(key, formData[key]);
        if (errorMsg) {
          newErrors[key] = errorMsg;
        }
      });

      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        const result = await createStudyGroup(formData);
        console.log("Study group created:", result);
        navigate(`/study/${result.id}`);
      }
    } catch (error) {
      console.log("Failed to create study group:", error.message);
    }
  };

  return (
    <div className="StudyCreate">
      <h2 className="page-title">스터디 만들기</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label for="nickname">닉네임</label>
          <input
            id="nickname"
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            placeholder="닉네임을 입력해 주세요"
            maxLength={12}
            className={errors.nickname ? "error-input" : ""}
          />
          {errors.nickname && (
            <div className="error-msg">*{errors.nickname}</div>
          )}
        </div>
        <div className="input-container">
          <label for="study-title">스터디 이름</label>
          <input
            id="study-title"
            type="text"
            name="studyname"
            value={formData.studyname}
            onChange={handleChange}
            placeholder="스터디 이름을 입력해주세요"
            className={errors.studyname ? "error-input" : ""}
          />
          {errors.studyname && (
            <div className="error-msg">*{errors.studyname}</div>
          )}
        </div>
        <div className="input-container">
          <label for="self-intro">소개</label>
          <textarea
            id="self-intro"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="소개 멘트를 작성해 주세요."
            className={errors.description ? "error-input" : ""}
          />
          {errors.description && (
            <div className="error-msg">*{errors.description}</div>
          )}
        </div>
        <div className="input-container">
          <label>배경 이미지를 선택해주세요</label>
          <fieldset className="background-option-container">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => {
              return (
                <BackgroundOption
                  key={index}
                  imgId={index}
                  onChange={handleChange}
                />
              );
            })}
          </fieldset>
          {errors.img && <div className="error-msg">*{errors.img}</div>}
        </div>
        <div className="input-container input-container-password">
          <label for="password">비밀번호</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="비밀번호를 입력해 주세요"
            className={errors.password ? "error-input" : ""}
          />
          {errors.password && (
            <div className="error-msg">*{errors.password}</div>
          )}
          <img
            src={showPassword ? pwIconOn : pwIconOff}
            className="btn-showPassword"
            onClick={handlePasswordToggle}
            alt="password show icon"
          />
        </div>
        <div className="input-container input-container-password">
          <label for="password-confirm">비밀번호 확인</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password-confirm"
            name="passwordConfirm"
            value={formData.passwordConfirm}
            onChange={handleChange}
            placeholder="비밀번호를 다시 한번 입력해 주세요"
            className={errors.passwordConfirm ? "error-input" : ""}
          />
          {errors.passwordConfirm && (
            <div className="error-msg">*{errors.passwordConfirm}</div>
          )}
          <img
            src={showPassword ? pwIconOn : pwIconOff}
            className="btn-showPassword"
            onClick={handlePasswordToggle}
            alt="password show icon"
          />
        </div>
        <button type="submit" className="create-button">
          만들기
        </button>
      </form>
    </div>
  );
}

export default StudyCreate;
