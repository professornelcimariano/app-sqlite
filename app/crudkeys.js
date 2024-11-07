import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Modal, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { insertKey, getAllKeys, updateKey, deleteKey } from './database/keys';

export default function CrudKeys() {
  const [keys, setKeys] = useState([]); // Lista de chaves
  const [modalVisible, setModalVisible] = useState(false); // Modal de adição e edição de chaves
  const [currentKey, setCurrentKey] = useState(null); // Chave atual para edição
  const [keyNumber, setKeyNumber] = useState(''); // Número da chave

  // Carregar todas as chaves no início
  useEffect(() => {
    loadKeys();
  }, []);

  // Função para carregar as chaves
  const loadKeys = async () => {
    const keysList = await getAllKeys();
    setKeys(keysList);
  };

  // Abrir o modal para nova chave
  const openAddModal = () => {
    setCurrentKey(null);
    setKeyNumber('');
    setModalVisible(true);
  };

  // Abrir o modal para editar chave
  const openEditModal = (key) => {
    setCurrentKey(key);
    setKeyNumber(key.number.toString());
    setModalVisible(true);
  };

  // Verificar duplicação e salvar nova chave ou editar chave existente
  const saveKey = async () => {
    const duplicate = keys.find(key => key.number === parseInt(keyNumber));

    if (duplicate && (!currentKey || duplicate.id !== currentKey.id)) {
      Alert.alert("Erro", "Esse número de chave já está cadastrado.");
      return;
    }

    if (currentKey) {
      // Editar chave existente
      await updateKey(currentKey.id, parseInt(keyNumber));
    } else {
      // Inserir nova chave
      await insertKey(parseInt(keyNumber));
    }
    setModalVisible(false);
    loadKeys();
  };

  // Excluir uma chave
  const handleDeleteKey = async (keyId) => {
    await deleteKey(keyId);
    loadKeys();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Chaves</Text>
      <FlatList
        data={keys}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.keyItem}>
            <View>
              <Text style={styles.keyText}>Chave: {item.number}</Text>
            </View>
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.editButton} onPress={() => openEditModal(item)}>
                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteKey(item.id)}>
                <Text style={styles.buttonText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <TouchableOpacity style={styles.addButton} onPress={openAddModal}>
        <Text style={styles.addButtonText}>Adicionar Chave</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {currentKey ? 'Editar Chave' : 'Adicionar Nova Chave'}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Número da Chave"
              keyboardType="numeric"
              value={keyNumber}
              onChangeText={setKeyNumber}
            />
            <TouchableOpacity style={styles.saveButton} onPress={saveKey}>
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f4f7',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
    fontWeight: 'bold',
  },
  keyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  keyText: {
    fontSize: 18,
    color: '#333',
  },
  actionButtons: {
    flexDirection: 'row',
  },
  editButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  deleteButton: {
    backgroundColor: '#f44336',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 15,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: '#f44336',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
