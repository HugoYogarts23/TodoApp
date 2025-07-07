import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity, Modal, Switch } from 'react-native';

export default function App() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodoId, setCurrentTodoId] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const addTodo = () => {
    if (todo.trim()) {
      setTodos([...todos, { id: Date.now().toString(), text: todo }]);
      setTodo('');
    }
  };

  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const startEditing = (id, text) => {
    setCurrentTodoId(id);
    setTodo(text);
    setIsEditing(true);
  };

  const updateTodo = () => {
    setTodos(todos.map(item => (item.id === currentTodoId ? { ...item, text: todo } : item)));
    setTodo('');
    setIsEditing(false);
    setCurrentTodoId(null);
  };

  const toggleSwitch = () => {
    setIsDarkMode(previousState => !previousState);
  };

  const themeStyles = {
    textColor: isDarkMode ? '#ffffff' : '#000000',
    inputBackground: isDarkMode ? '#2c2c2c' : '#ffffff',
    borderColor: isDarkMode ? '#666' : '#ccc',
  };

  return (
    <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      <Text style={[styles.title, { color: themeStyles.textColor }]}>Todo App</Text>
      <View style={styles.switchContainer}>
        <Switch
          value={isDarkMode}
          onValueChange={toggleSwitch}
          style={styles.switch}
        />
        <Text style={[styles.switchLabel, { color: themeStyles.textColor }]}>
          {isDarkMode ? "Dark Mode" : "Light Mode"}
        </Text>
      </View>
      <TextInput
        style={[styles.input, { backgroundColor: themeStyles.inputBackground, borderColor: themeStyles.borderColor, color: themeStyles.textColor }]}
        placeholder="Add a new todo"
        placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
        value={todo}
        onChangeText={setTodo}
      />
      <Button title={isEditing ? "Update Todo" : "Add Todo"} onPress={isEditing ? updateTodo : addTodo} />
      <FlatList
        data={todos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => startEditing(item.id, item.text)}>
            <View style={styles.todoItem}>
              <Text style={[styles.todoText, { color: themeStyles.textColor }]}>{item.text}</Text>
              <Button title="Delete" onPress={() => removeTodo(item.id)} color="red" />
            </View>
          </TouchableOpacity>
        )}
      />
      <Modal visible={isEditing} animationType="slide">
        <View style={[styles.modalContainer, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
          <Text style={[styles.modalTitle, { color: themeStyles.textColor }]}>Edit Todo</Text>
          <TextInput
            style={[styles.input, { backgroundColor: themeStyles.inputBackground, borderColor: themeStyles.borderColor, color: themeStyles.textColor }]}
            placeholder="Update your todo"
            placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
            value={todo}
            onChangeText={setTodo}
          />
          <Button title="Update" onPress={updateTodo} />
          <Button title="Cancel" onPress={() => setIsEditing(false)} color="gray" />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  lightContainer: {
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  todoItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  todoText: {
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  switch: {
    marginRight: 10,
  },
  switchLabel: {
    fontSize: 16,
  },
});
