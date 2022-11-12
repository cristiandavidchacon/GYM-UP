import { useEffect, useState } from "react";
import AssistanceTable from ".";

const AssistanceTableWrapper = () => {
  const testColumns = [
    {
      key: "name",
      label: "NAME",
    },
    {
      key: "role",
      label: "ROLE",
    },
    {
      key: "status",
      label: "STATUS",
    },
  ];

  const rows = [
    {
      key: "1",
      name: "Tony Reichert",
      role: "CEO",
      status: "Active",
    },
    {
      key: "2",
      name: "Zoey Lang",
      role: "Technical Lead",
      status: "Paused",
    },
    {
      key: "3",
      name: "Jane Fisher",
      role: "Senior Developer",
      status: "Active",
    },
    {
      key: "4",
      name: "William Howard",
      role: "Community Manager",
      status: "Vacation",
    },
  ];

  const [columns, setColumns] = useState(testColumns);
  const [dataSource, setDataSource] = useState(rows);

  useEffect(() => {
    // setColumns(testColumns);
    // setDataSource(rows);
  }, []);

  return <AssistanceTable data={dataSource} columnHeaders={columns} />;
};

export default AssistanceTableWrapper;
