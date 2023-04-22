import React, { useEffect, useState } from "react";
import { Box, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import styled from "@emotion/styled";
import Intensity from "./Charts/Intensity";
import Likelihood from "./Charts/Likelihood";
import Relevance from "./Charts/Relevance";
import Country from "./Charts/Country";
import Year from "./Charts/Year";
import Topics from "./Charts/Topics";
import Region from "./Charts/Region";
import Added from "./Charts/Added";
import Published from "./Charts/Published";

const gridTemplate = `
"a b c"
"a b c"
"a b c"
"a b f"
"d e f"
"d e f"
"d e f"
"d e i"
"d h i"
"g h i"
"g h i"
"g h i"
`;

const RootDashboard = styled.div`
  padding: 1rem 3rem;
  display: flex;
`;

const DashBox = styled(Box)`
  background-color: #aaabc5;
  border-radius: 1rem;
  box-shadow: "0.15rem 0.2rem 0.15rem 0.1rem rgba(0,0,0,0.8)
`;

const FormRoot = styled(FormControl)`
  width: 80%;
  padding-bottom: 20px;
  padding-right: 23px;
`;

const InputName = styled(InputLabel)`
  font-family: "Inter";
  font-weight: 600;
`;

const DropDown = styled(Select)`
  border: 2px solid #aaabc9;
  background-color: #aaabc5;
`;

const DashboardComponent = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState([]);

  const fetchData = async (queryParams) => {
    const query = new URLSearchParams(queryParams).toString();
    const response = await fetch(`http://localhost:3001/dashboard?${query}`);
    const jsonData = await response.json();
    setData(jsonData.list);
    setFilters(jsonData.filters);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFilterChange = async (filterKey, filterValue) => {
    const queryParams = {
      [filterKey]: filterValue,
    };
    fetchData(queryParams);
  };

  const renderFilterOptions = (filterKey) => {
    const filterOption = filters.find((i) => i.key === filterKey);
    return filterOption?.list?.map((option) => (
      <MenuItem key={option} value={option}>
        {option}
      </MenuItem>
    ));
  };

  return (
    <>
      <Box
        mb="1rem"
        p="0.8rem 3rem"
        fontSize="2rem"
        fontWeight="800"
        color="#424594"
      >
        Dashboard
      </Box>
      <RootDashboard>
        <div>
          {filters.map((filterItem) => {
            const { key, label } = filterItem;
            return (
              <FormRoot fullWidth>
                <InputName id={key}>{label} </InputName>
                <DropDown
                  type="text"
                  labelId={key}
                  id={key}
                  label={label}
                  onChange={(e) => handleFilterChange(key, e.target.value)}
                >
                  {renderFilterOptions(key)}
                </DropDown>
              </FormRoot>
            );
          })}
        </div>
        <Box
          width="200rem"
          borderRadius="20px"
          height="100%"
          display="grid"
          gap="1.5rem"
          sx={{
            gridTemplateColumns: "repeat(3, minmax(370px, 1fr))",
            gridTemplateAreas: gridTemplate,
            gridTemplateRows: "repeat(10, minmax(60px, 1px)) ",
          }}
        >
          <DashBox gridArea="a">
            <Intensity data={data} />
          </DashBox>
          <DashBox gridArea="b">
            <Likelihood data={data} />
          </DashBox>
          <DashBox gridArea="c">
            <Relevance data={data} />
          </DashBox>
          <DashBox gridArea="d">
            <Country data={data} />
          </DashBox>
          <DashBox gridArea="e">
            <Year data={data} />
          </DashBox>
          <DashBox gridArea="f">
            <Topics data={data} />
          </DashBox>
          <DashBox gridArea="g">
            <Region data={data} />
          </DashBox>
          <DashBox gridArea="h">
            <Added data={data} />
          </DashBox>
          <DashBox gridArea="i">
            <Published data={data} />
          </DashBox>
        </Box>
      </RootDashboard>
    </>
  );
};

export default DashboardComponent;
