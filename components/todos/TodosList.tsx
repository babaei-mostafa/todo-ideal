import { useState } from "react";

// material-ui
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";

// project-imports
import TodoCard from "./TodoCard";
import CreateTask from "./CreateTask";
import { ITodo } from "@/interfaces/todo";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

// <<===============|| CUSTOM TAB PANEL ||===============>>

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface Props {
  todos: ITodo[] | undefined;
  refetch: () => void;
}

// <<===============|| TODOS LIST - COMPONENT ||===============>>

export default function TodosListComponent({ todos, refetch }: Props) {
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container sx={{ display: "block" }}>
      <Paper sx={{ mt: 4 }}>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              variant="fullWidth"
            >
              <Tab label="Today's Task" {...a11yProps(0)} />
              <Tab label="Tomorrow's Task" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <Box sx={{ backgroundColor: theme.palette.secondary.main }}>
            <CustomTabPanel value={value} index={0}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Stack>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    Tody's Task
                  </Typography>
                  <Typography variant="caption">Wednesday, 11 May</Typography>
                </Stack>
                <CreateTask />
              </Stack>
              <Stack sx={{ p: 2 }} spacing={4}>
                {todos && todos?.length
                  ? todos?.map((item) => (
                      <TodoCard
                        refetchList={refetch}
                        item={item}
                        key={`todo-${item._id}`}
                      />
                    ))
                  : null}
              </Stack>
            </CustomTabPanel>
          </Box>
          <CustomTabPanel value={value} index={1}>
            Item Two
          </CustomTabPanel>
        </Box>
      </Paper>
    </Container>
  );
}
