import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { initDb } from './database/db';

export default function App() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const loadData = async () => {
      const db = await initDb();
      const allRows = await db.getAllAsync('SELECT * FROM items');
      setItems(allRows);
    };
    loadData();
  }, []);

  return (
    <View>
      <Text>Lista de Itens</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text>{`${item.value} - ${item.intValue}`}</Text>
        )}
      />
    </View>
  );
}
