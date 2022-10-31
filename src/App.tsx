import React from 'react';
import { Container, Button, Modal, Box, Typography, TextField } from '@mui/material';
import './App.css';
import CustomCard from './components/CustomCard';
import { CardDto } from './@types/props';

const App: React.FC = () => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const[task, setTask] = React.useState<CardDto>({
    name: '',
    description: ''
  });
  const[allTasks, setAllTasks] = React.useState<CardDto[]>([]);
  const [show, setShow] = React.useState(false);

  const handlePush = (type: 'add' | 'edit' | 'delete', data?: object) => {
    if(type === 'add'){
      allTasks.push(task);
      setTask({
        name: "",
        description: "",
      });
      console.log(task)
      setShow(false);
      setAllTasks(allTasks);
    }
    if(type === 'edit'){
      let newData = {...data, name: task.name, description: task.description}
      setTask(newData);

      let newArr = allTasks.map(obj => {
        if(allTasks.indexOf(obj) === index){
          return {...obj, name: task.name, description: task.description}
        }
        return obj;
      })
      setAllTasks(newArr)
      setIsEditing(false);
      setShow(false)
    }
    if(type === 'delete'){
      const data = [...allTasks];
      data.splice(index, 1);
      setAllTasks(data);
    }
  };

  const style = {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {xs: 300, md: 400},
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const handleShow = () => setShow(true);
  const handleHide = () => {
    setShow(false);
    setIsEditing(false);
  };

  return(
    <Container maxWidth="sm">
      <Button onClick={handleShow} variant="contained" sx={{marginBottom: 5, marginTop: 5}}>
        Add Task
      </Button>
      <Modal open={show} onClose={handleHide}>
        <Box sx={style}>
          <Typography>{isEditing ? 'Edit' : 'Add'} task</Typography>
          <TextField 
            size='small'
            id="outlined-basic" 
            label="Task name" 
            variant="outlined" 
            value={task.name}
            onChange={(name) => setTask({...task, name: name.target.value})}
          />
          <TextField 
            size='small'
            id="outlined-basic" 
            label="Task description" 
            variant="outlined" 
            value={task.description}
            onChange={(description) => setTask({...task, description: description.target.value})}
          />
          <Button onClick={() => isEditing ? handlePush('edit', task) : handlePush('add')} variant="contained" sx={{marginBottom: 5}}>
            {isEditing ? 'Edit' : 'Add'}
          </Button>
        </Box>
      </Modal>

      {allTasks.map(({name, description}, index) => {
        return (
          <CustomCard 
            key={index} 
            name={name} 
            description={description}
            handlePush={() => handlePush('delete')}
            setShow={() => {
              let data = allTasks[index];
              setTask(data);
              setShow(true);
              setIndex(index);
              setIsEditing(true);
            }}
          />
        )
      })}
    </Container>
  )
}

export default App;
