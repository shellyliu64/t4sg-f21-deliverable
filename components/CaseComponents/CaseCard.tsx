import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardTitle,
  CardSubtitle,
  CardText,
} from "reactstrap";
import { useMutation, useQuery } from "urql";
import { Box, Button } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";


type CaseCardProps = {
  data: CaseData;
};

export type CaseData = {
  name: string;
  status: string;
  description: string;
  id: number;
};

const DeleteCaseMutation = `
mutation DeleteCaseMutation($id: bigint!) {
  delete_cases_by_pk(id: $id) {
    name
  }
}
`;


const CaseCard: React.FC<CaseCardProps> = (props) => {
  const caseData = props.data;
  const [result, executeMutation] = useMutation(DeleteCaseMutation);


  return (
    <Container>
      <div style={{ width: "100%", padding: "5px" }}>
        <Card body style={{ backgroundColor: "#e4ebf5" }}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
          >
            <CardTitle tag="h3">{caseData.name}</CardTitle>
            <Button
              onClick={() => {
                executeMutation({
                  id: caseData.id,
                });
                window.location.reload();
              }}
        >
          <CloseIcon />

        </Button>
          </Box>

          <CardSubtitle tag="h6" className="mb-2 text-muted">
            {caseData.status}
          </CardSubtitle>
          <CardText>{caseData.description}</CardText>
        </Card>
      </div>
    </Container>
  );
};
export default CaseCard;
