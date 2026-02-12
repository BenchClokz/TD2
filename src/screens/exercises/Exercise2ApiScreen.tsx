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
import { ApiPost, createPost, getPosts } from '../../lib/axiosLike';
import { PaperLoader } from '../../lib/paperLike';

type Props = {
  navigation: AppNavigation;
};

function Exercise2ApiScreen({ navigation }: Props) {
  const [posts, setPosts] = useState<ApiPost[]>([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      try {
        const data = await getPosts();
        setPosts(data);
      } catch {
        setMessage('Erreur lors du chargement des posts.');
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  const submitPost = async () => {
    if (!title.trim() || !body.trim()) {
      setMessage('Veuillez remplir le titre et le contenu.');
      return;
    }

    setLoading(true);
    try {
      const created = await createPost({ title: title.trim(), body: body.trim() });
      setPosts(prev => [{ ...created, id: Date.now() }, ...prev]);
      setTitle('');
      setBody('');
      setMessage('Post ajouté avec succès.');
    } catch {
      setMessage('Impossible de créer le post.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Ex 2 - REST API</Text>
        <PaperLoader visible={loading} />

        <TextInput placeholder="Titre" value={title} onChangeText={setTitle} style={styles.input} />
        <TextInput placeholder="Contenu" value={body} onChangeText={setBody} style={styles.input} />

        <TouchableOpacity style={styles.button} onPress={submitPost}>
          <Text style={styles.buttonText}>Ajouter un post (POST)</Text>
        </TouchableOpacity>

        {message ? <Text style={styles.message}>{message}</Text> : null}

        <FlatList
          data={posts}
          keyExtractor={item => `${item.id}`}
          renderItem={({ item }) => (
            <View style={styles.postCard}>
              <Text style={styles.postTitle}>{item.title}</Text>
              <Text style={styles.postBody}>{item.body}</Text>
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
  button: {
    backgroundColor: '#2563eb',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
  message: {
    color: '#065f46',
    marginBottom: 8,
    fontWeight: '600',
  },
  postCard: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 8,
  },
  postTitle: {
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 4,
  },
  postBody: {
    color: '#334155',
  },
  backButton: {
    backgroundColor: '#1f2937',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 10,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
});

export default Exercise2ApiScreen;
