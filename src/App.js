import './App.css';
import { withAuthenticator, Button, Heading, Text, TextField, View, Divider } from '@aws-amplify/ui-react';
import React, { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { createTodo, updateTodo, deleteTodo} from './graphql/mutations';
import { listTodos } from './graphql/queries';


const initialState = { name: ' ', description: ' ' }

function App({signOut, user}) {
  const [formState, setFormState] = useState(initialState)
  const [todos, setTodos] = useState([])

  useEffect(() => {
    fetchTodos()
  }, [])

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }

  async function fetchTodos() {
    try {
      const todoData = await API.graphql(graphqlOperation(listTodos))
      const todos = todoData.data.listTodos.items
      setTodos(todos)
    } catch (err) { console.log('error fetching todos') }
  }

  async function addTodo() {
    try {
      if (!formState.name || !formState.description) return
      const todo = { ...formState }
      setTodos([...todos, todo])
      setFormState(initialState)
      await API.graphql(graphqlOperation(createTodo, {input: todo}))
    } catch (err) {
      console.log('error creating todo:', err)
    }
  }
  async function deleteTodos(todo) {
    try {  
      await API.graphql(graphqlOperation(deleteTodo, {input: { id: todo.id }}))      
    } catch (err) {
      console.log('error deleting todo:', err)
    }
  }

  async function updateTodos(todo) {
    try {  
      await API.graphql(graphqlOperation(updateTodo, {input: { id: todo.id }}))      
    } catch (err) {
      console.log('error update todo:', err)
    }
  }

  return (
    <View style={styles.container}>
    <View style={styles.heading}>
    <Heading level={1}>Hello <Text
    variation="secondary"
    as="span"
    lineHeight="0.5em"
    fontWeight={250}
    fontSize=".5em"
    fontStyle="normal"
    textDecoration="none"
    width="30vw"
  >
    {user.attributes.email}
</Text></Heading>
    
    <Button style={styles.button}onClick={signOut}>Sign out</Button>
    </View>
    <Divider orientation="horizontal" />
    <Heading level={2}>Amplify Todos</Heading>
    <TextField
      placeholder="Name"
      onChange={event => setInput('name', event.target.value)}
      style={styles.input}
      defaultValue={formState.name}
    />
    <TextField
      placeholder="Description"
      onChange={event => setInput('description', event.target.value)}
      style={styles.input}
      defaultValue={formState.description}
    />
    <Button style={styles.button} onClick={addTodo}>Create Todo</Button>
    
    {
      todos.map((todo, index) => (
        <View key={todo.id ? todo.id : index} style={styles.todo}>
          <Text style={styles.todoName}>{todo.name}</Text>
          <Text style={styles.todoDescription}>{todo.description}</Text>
          <Button style={styles.button} onClick={() => deleteTodos(todo)}>Delete Todo</Button>
        </View>
      ))
    }
  </View>
  );
}

const styles = {
  heading: {display: 'flex', justifyContent: 'space-between', alignItems: 'center'},
  container: { width: 600, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 },
  todo: {  marginBottom: 15},
  input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
  todoName: { fontSize: 20, fontWeight: 'bold' },
  todoDescription: { marginBottom: 0 },
  button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 12, padding: '12px 6px' }
}

export default withAuthenticator(App);
