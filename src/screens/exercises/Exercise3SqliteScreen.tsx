import React, { useEffect, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { AppNavigation } from '../../navigation/types';
import { deleteTask, initDb, insertTask, selectTasks, Task } from '../../lib/sqliteLike';

type Props = {
  navigation: AppNavigation;
};

function Exercise3SqliteScreen({ navigation }: Props) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskTitle, setTaskTitle] = useState('');

  const loadTasks = async () => {
    const allTasks = await selectTasks();
    setTasks(allTasks);
  };

  useEffect(() => {
    const setup = async () => {
      await initDb();
      await loadTasks();
    };

    setup();
  }, []);

  const onAddTask = async () => {
    if (!taskTitle.trim()) {
      return;
    }

    await insertTask(taskTitle.trim());
    setTaskTitle('');
    await loadTasks();
  };

  const onDeleteTask = async (id: number) => {
    await deleteTask(id);
    await loadTasks();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Ex 3 - SQLite (simulation locale)</Text>

        <TextInput
          value={taskTitle}
          onChangeText={setTaskTitle}
          style={styles.input}
          placeholder="Ajouter une tâche"
        />

        <TouchableOpacity style={styles.addButton} onPress={onAddTask}>
          <Text style={styles.addButtonText}>Insérer tâche (SQL INSERT)</Text>
        </TouchableOpacity>

        <FlatList
          data={tasks}
          keyExtractor={item => `${item.id}`}
          ListEmptyComponent={<Text style={styles.empty}>Aucune tâche en base.</Text>}
          renderItem={({ item }) => (
            <View style={styles.taskItem}>
              <Text style={styles.taskText}>{item.title}</Text>
              <TouchableOpacity style={styles.deleteButton} onPress={() => onDeleteTask(item.id)}>
                <Text style={styles.deleteText}>Supprimer</Text>
              </TouchableOpacity>
            </View>
          )}
        />

        <TouchableOpacity style={styles.backButton} onPress={navigation.goBack}>
          <Text style={styles.backButtonText}>Retour</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: '#2563eb',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 11,
    marginBottom: 10,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
  taskItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 10,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskText: {
    color: '#1f2937',
    flex: 1,
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: '#dc2626',
    borderRadius: 8,
    paddingVertical: 7,
    paddingHorizontal: 10,
  },
  deleteText: {
    color: '#fff',
    fontWeight: '700',
  },
  empty: {
    textAlign: 'center',
    color: '#64748b',
    marginTop: 16,
  },
  backButton: {
    marginTop: 8,
    backgroundColor: '#1f2937',
    alignItems: 'center',
    paddingVertical: 11,
    borderRadius: 10,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
});

export default Exercise3SqliteScreen;
