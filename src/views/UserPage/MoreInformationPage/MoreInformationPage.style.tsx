import styled from "styled-components";
import {greyColor, mainColor} from "@util/style/color";

export const MoreInformationTitle = styled.h2`
  margin: 18px auto 53px;
  font: normal normal normal 20px/35px NEXON Lv1 Gothic;
  color: ${greyColor};
  text-align: center;
`;

export const MoreInformationForm = styled.form`
  width: 323px;
  margin: 0 auto;
`;

export const TextInput = styled.input`
  width: calc(100% - 9px);
  height: 20px;
  padding-left: 7px;
  border: 1px solid ${greyColor};
  border-radius: 20px;
  font: 9px/11px normal;
  color: ${greyColor};
`;

export const InputGroup = styled.div`
  margin-bottom: 30px;
`;

export const SubmitButton = styled.button`
  width: 100%;
  height: 34px;
  margin-top: 83px;
  border: 1px solid ${mainColor};
  border-radius: 20px;
  font: normal normal normal 13px/15px NEXON Lv1 Gothic;
  color: ${mainColor};
  background: transparent;
  cursor: pointer;
`;
