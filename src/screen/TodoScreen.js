import React, { useState } from 'react'; 
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, Modal } from 'react-native';
import { IconButton, Checkbox } from 'react-native-paper';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Fallback from '../components/Fallback';

const TodoScreen = () => {
    const [todoTitle, setTodoTitle] = useState("");
    const [todoDescription, setTodoDescription] = useState("");
    const [todoList, setTodoList] = useState([
        {
            id: "01",
            title: "Assignment",
            description: "Complete math assignment",
            done: false,
        },
        {
            id: "02",
            title: "Wash Dishes",
            description: "Wash all the dishes in the sink",
            done: false,
        },
    ]);
    const [modalVisible, setModalVisible] = useState(false);
    const [viewedTodo, setViewedTodo] = useState(null);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editedTodo, setEditedTodo] = useState(null);

    // Function to add a new task to the list
    const addTodo = () => {
        if (todoTitle.trim() && todoDescription.trim()) {
            setTodoList([...todoList, { 
                id: (todoList.length + 1).toString(), 
                title: todoTitle, 
                description: todoDescription,
                done: false,
            }]);
            setTodoTitle(""); 
            setTodoDescription(""); 
            setEditModalVisible(false);
        }
    };

    // Handle delete
    const handleDeleteTodo = (id) => {
        const updatedToDoList = todoList.filter((todo) => todo.id !== id);
        setTodoList(updatedToDoList);
    };

    // Handle edit
    const handleEditTodo = (todo) => {
        if (!todo.done) {
            setEditedTodo(todo);
            setTodoTitle(todo.title); 
            setTodoDescription(todo.description); 
            setEditModalVisible(true);
        }
    };

    // Handle update
    const handleUpdateTodo = () => {
        const updatedTodos = todoList.map((item) => {
            if (item.id === editedTodo.id) {
                return { ...item, title: todoTitle, description: todoDescription };
            }
            return item; 
        });
        setTodoList(updatedTodos); 
        setEditedTodo(null); 
        setTodoTitle(""); 
        setTodoDescription(""); 
        setEditModalVisible(false);
    };

    // Toggle the "done" state of a task
    const toggleDone = (id) => {
        const updatedTodos = todoList.map((item) => {
            if (item.id === id) {
                return { ...item, done: !item.done }; 
            }
            return item;
        });
        setTodoList(updatedTodos);
    };

    // Show task details in a modal
    const viewTaskDetails = (todo) => {
        setViewedTodo(todo);
        setModalVisible(true);
    };

    return (
        <View style={{ marginHorizontal: 16 }}>
            <TouchableOpacity  
                style={styles.addButton}
                onPress={() => setEditModalVisible(true)}
            >
                <Text style={styles.addButtonText}>Add To Do</Text>
            </TouchableOpacity>

            {todoList.length > 0 ? (
                <FlatList 
                    data={todoList} 
                    renderItem={({ item }) => (
                        <View style={styles.todoItem}>
                            <Checkbox
                                status={item.done ? 'checked' : 'unchecked'}
                                onPress={() => toggleDone(item.id)}
                                color="#FF7F3E"
                            />
                            <TouchableOpacity
                                style={styles.titleContainer}
                                onPress={() => viewTaskDetails(item)}
                            >
                                <Text style={[styles.todoText, item.done && styles.todoTextDone]}>
                                    {item.title}
                                </Text>
                            </TouchableOpacity>
                            <IconButton 
                                icon="pencil" 
                                iconColor={item.done ? "#CCC" : "#FF7F3E"}
                                onPress={() => handleEditTodo(item)} 
                                disabled={item.done} 
                            />
                            <IconButton 
                                icon="trash-can" 
                                iconColor="#FF7F3E" 
                                onPress={() => handleDeleteTodo(item.id)} 
                            />
                        </View>
                    )}
                    keyExtractor={(item) => item.id} 
                />
            ) : (
                <Fallback />
            )}

            {/* Modal for Viewing Task Details */}
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {viewedTodo && (
                            <>
                                <Text style={styles.modalTitle}>{viewedTodo.title}</Text>
                                <Text style={styles.modalDescription}>{viewedTodo.description}</Text>
                                <TouchableOpacity 
                                    style={styles.modalButton}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Text style={styles.addButtonText}>Close</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                </View>
            </Modal>

            {/* Modal for Adding/Editing Todos */}
            <Modal
                visible={editModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setEditModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TextInput 
                            style={styles.input}
                            placeholder="Task Title"
                            value={todoTitle}
                            onChangeText={setTodoTitle} 
                        />
                        <TextInput 
                            style={styles.input}
                            placeholder="Task Description"
                            value={todoDescription}
                            onChangeText={setTodoDescription} 
                            multiline
                        />

                        {editedTodo ? (
                            <TouchableOpacity  
                                style={styles.modalButton}
                                onPress={handleUpdateTodo}
                            >
                                <Text style={styles.addButtonText}>Update</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity  
                                style={styles.modalButton}
                                onPress={addTodo}
                            >
                                <Text style={styles.addButtonText}>Add</Text>
                            </TouchableOpacity>
                        )}

                        <TouchableOpacity 
                            style={styles.modalButton}
                            onPress={() => setEditModalVisible(false)}
                        >
                            <Text style={styles.addButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default TodoScreen;

const styles = StyleSheet.create({
    input: {
        borderWidth: 2,
        borderColor: "#FADFA1",            
        borderRadius: 15,                   
        paddingVertical: 12,                
        paddingHorizontal: 18,
        fontSize: 16,                       
        marginVertical: 12,                 
        backgroundColor: "#FFF",            
        shadowColor: "#000",                
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,                 
        shadowRadius: 4,
    },
    addButton: {
        backgroundColor: "#FADFA1",         
        borderRadius: 20,                   
        paddingVertical: hp('2%'),  
        marginVertical: hp('2%'),    
        marginTop: hp('5%'),         
        alignItems: "center",
        justifyContent: "center",           
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 }, 
        shadowOpacity: 0.3,                 
        shadowRadius: 6,
    },
    addButtonText: {
        color: "#536493",                   
        fontWeight: "600",                
        fontSize: 20,                      
        letterSpacing: 1,                   
        textTransform: "uppercase",         
    },
    todoItem: {
        backgroundColor: "#FADFA1",         
        borderRadius: 12,                   
        paddingHorizontal: 20,              
        paddingVertical: 16,                
        marginBottom: 18,                   
        flexDirection: "row",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,                 
        shadowRadius: 5,
    },
    titleContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    todoText: {
        color: "#536493",                   
        fontSize: 18,                       
        fontWeight: "600",                  
        flex: 1,                            
        marginRight: 10,                    
    },
    todoTextDone: {
        textDecorationLine: 'line-through',
        color: "#AAA",
    },
    todoDescription: {
        color: "#536493",
        fontSize: 14,
        fontStyle: 'italic',
        marginTop: 4,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        width: "90%", 
        backgroundColor: "#FFF",
        borderRadius: 10,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalButton: {
        backgroundColor: "#FADFA1",
        borderRadius: 20,
        paddingVertical: 14,
        marginVertical: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalDescription: {
        fontSize: 16,
        marginBottom: 20,
    },
});
