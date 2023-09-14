
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from 'react-router-dom';

export default function FilesData(list, handleDelete, currentPage, itemsPerPage) {
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = list.slice(indexOfFirstItem, indexOfLastItem);

  const columns = [
    { Header: "ID", accessor: "id", width: "10%", align: "left" },
    { Header: "File Name", accessor: "fileName", width: "15%", align: "left" },
    { Header: "FileType", accessor: "fileType", width: "25%", align: "left" },
    { Header: "Status", accessor: "status", width: "10%", align: "center" },
    { Header: "Length", accessor: "length", width: "15%", align: "center" },
    { Header: "Action", accessor: "action", width: "20%", align: "center" },
  ];

  const rows = currentItems.map((item) => ({
    id: item.id,
    fileName: item.name,
    fileType: item.description,
    status: (
      <MDBox ml={-1}>
        <MDBadge badgeContent="Uploaded" color="success" variant="gradient" size="sm" />
      </MDBox>
    ),
    length: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {item.size}
      </MDTypography>
    ),
    action: (
      <MDBox display="flex" alignItems="center" justifyContent="center">
        <MDTypography
          component={Link}
          to={`/split/${item.id}`}
          variant="caption"
          color="text"
          fontWeight="medium"
          marginRight={3}
           
        >
          Split
        </MDTypography>
        <DeleteIcon color="action" marginLeft={2} onClick={() => handleDelete(item.id)} />
      </MDBox>
    ),
  }));

  return { columns, rows };
}
