import { useState } from "react";
import {
  SidebarBoardDiv,
  SideBarCommunityDivWrapper,
  SideBarCommunityElementDiv,
  SidebarRecipeElement,
} from "../../styles/sidebar_styles";
import SidebarMyAccount from "./sidebar_my_account";
import { useNavigate } from "react-router-dom";

const SidebarElementList = ({ sidebarClose }) => {
  const [elements, setElements] = useState(["공지사항", "자랑", "잡담"]);
  const navigate = useNavigate();

  return (
    <SidebarBoardDiv>
      <SidebarMyAccount />
      <SidebarRecipeElement
        onClick={() => {
          navigate("/recipe", {
            state: {
              keyword: "",
              searchTag: "",
            },
          });
          sidebarClose();
        }}
      >
        레시피
      </SidebarRecipeElement>
      <div>
        <SideBarCommunityDivWrapper>커뮤니티</SideBarCommunityDivWrapper>

        <SideBarCommunityElementDiv
          onClick={() => {
            navigate("/community/my-cook");
            sidebarClose();
          }}
        >
          요리자랑
        </SideBarCommunityElementDiv>
      </div>
      <div
        onClick={() => {
          navigate("/");
          sidebarClose();
        }}
      >
        홈
      </div>
    </SidebarBoardDiv>
  );
};

export default SidebarElementList;
