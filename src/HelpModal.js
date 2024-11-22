import React, { useState } from "react";
import { Paper, Typography } from "@material-ui/core";
import "./HelpModal.css";

const HelpModal = () => {
  const [expanded, setExpanded] = useState(null);

  const handleExpand = (index) => {
    setExpanded((prevExpanded) => (prevExpanded === index ? null : index));
  };

  return (
    <div className="modal-container">
      <Paper className="modal-paper" style={{maxWidth:"600px"}}>
      <div className="modal-content">
        <Paper className="modal-section">
          <Paper>
            <Typography variant="h6" component="h3" className="modal-title">
              자주 묻는 질문(FAQ)
            </Typography>
          </Paper>
          <div className="faq-list">
            <div
              className={`faq-item ${expanded === 1 ? "expanded" : ""}`}
              onClick={() => handleExpand(1)}
            >
              <Typography variant="body1">
                <strong>질문 1:</strong> 어떻게 제품을 추가할 수 있나요?
              </Typography>
              {expanded === 1 && (
                <Typography variant="body1">
                  <strong>답변 1:</strong> "추가" 메뉴를 선택하고 필요한 정보를 입력하세요.
                </Typography>
              )}
            </div>
            <div
              className={`faq-item ${expanded === 2 ? "expanded" : ""}`}
              onClick={() => handleExpand(2)}
            >
              <Typography variant="body1">
                <strong>질문 2:</strong> 제품을 검색하는 방법을 알려주세요.
              </Typography>
              {expanded === 2 && (
                <Typography variant="body1">
                  <strong>답변 2:</strong> "검색" 메뉴를 선택하고 제품의 제목을 입력하면 검색 결과를 확인할 수 있습니다.
                </Typography>
              )}
            </div>
            <div
              className={`faq-item ${expanded === 3 ? "expanded" : ""}`}
              onClick={() => handleExpand(3)}
            >
              <Typography variant="body1">
                <strong>질문 3:</strong> 제품을 수정하려면 어떻게 해야 하나요?
              </Typography>
              {expanded === 3 && (
                <Typography variant="body1">
                  <strong>답변 3:</strong> "수정" 메뉴를 선택하고 수정할 제품의 제목을 입력한 후, 필요한 정보를 수정하세요.
                </Typography>
              )}
            </div>
            <div
              className={`faq-item ${expanded === 4 ? "expanded" : ""}`}
              onClick={() => handleExpand(4)}
            >
              <Typography variant="body1">
                <strong>질문 4:</strong> 제품을 삭제하는 방법을 알려주세요.
              </Typography>
              {expanded === 4 && (
                <Typography variant="body1">
                  <strong>답변 4:</strong> "삭제" 메뉴를 선택하고 삭제할 제품의 제목을 입력하세요. 해당 제품이 삭제됩니다.
                </Typography>
              )}
            </div>
          </div>
        </Paper>
      </div>
      </Paper>
    </div>
    
  );
};

export default HelpModal;