import React from "react";
import Button from "react-bootstrap/Button";
import { Container } from "reactstrap";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import "../../styles/casemanagement.module.css";
import Footer from "./Footer";
import CaseCategory from "./CaseCategory";
import AddCaseModal from "./Modals/AddCaseModal";
import { useQuery } from "urql";
import AddCategoryModal from "./Modals/AddCategoryModal";

/* 
  FEATURE 1 TODO:
  Write a query that will get the name AND id of 
  every category. Build this query, and verify it 
  works in Hasura, and then paste the query here.

  Make sure to replace the string that is currently
  in this variable 
*/
export const ManagementContainerQuery = `
query MyQuery {
  category {
    name
    id
  }
}
`;
// END TODO

export type ManagementCategory = {
  id: number;
  name: string;
};

const CaseManagementContainer: React.FC = (props) => {
  const [addCaseModalOpen, setAddCaseModalOpen] =
    React.useState<boolean>(false);
  const [addCategoryModalOpen, setAddCategoryModalOpen] =
    React.useState<boolean>(false);

  /* NOTE: This uses */
  const [{ data, fetching, error }, executeQuery] = useQuery({
    query: ManagementContainerQuery,
  });
  if (!data) return <div>Loading...</div>;


  return (
    <>
      <h5 className="title">Home Page</h5>
      {data.category.map((c:any) => {
      return(
        <Grid container spacing={3} key = {c.id}>
          <CaseCategory category_id = {c.id} />
        </Grid>
      );
      })}

      <AddCaseModal
        onClose={() => setAddCaseModalOpen(false)}
        open={addCaseModalOpen}
      />

      <AddCategoryModal
        onClose={() => setAddCategoryModalOpen(false)}
        open={addCategoryModalOpen}
      />

      <Container
        style={{
          width: "100%",
          borderStyle: "solid",
          padding: "0.75rem",
          marginTop: "0.75rem",
        }}
      >
        <Button variant="dark" onClick={() => setAddCategoryModalOpen(true)}>
          Add Category
        </Button>
        <Button variant="dark" onClick={() => "redirect"}>
          Delete Category
        </Button>
        <Button variant="dark" onClick={() => setAddCaseModalOpen(true)}>
          Add Case
        </Button>
        <Button variant="dark" onClick={() => "redirect"}>
          Delete Case
        </Button>
        <Button variant="dark" onClick={() => "redirect"}>
          Edit Case
        </Button>
      </Container>
    </>
  );
};
export default CaseManagementContainer;
