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
import { ApiPost, ApiUser, createPost, getPosts, getUsers } from '../../lib/axiosLike';
import { PaperLoader } from '../../lib/paperLike';

type Props = {
  navigation: AppNavigation;
};

function Exercise2ApiScreen({ navigation }: Props) {
  const [posts, setPosts] = useState<ApiPost[]>([]);
  const [users, setUsers] = useState<ApiUser[]>([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showUsers, setShowUsers] = useState(false);

  useEffect(() => {
    const loadApiData = async () => {
      setLoading(true);
      try {
        const [postsData, usersData] = await Promise.all([getPosts(), getUsers()]);
        setPosts(postsData);
        setUsers(usersData);
      } catch {
        setMessage('Erreur lors du chargement des donnees API.');
      } finally {
        setLoading(false);
      }
    };

    loadApiData();
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
        <Text style={styles.subtitle}>Source publique: JSONPlaceholder</Text>
        <PaperLoader visible={loading} />

        <TextInput placeholder="Titre" value={title} onChangeText={setTitle} style={styles.input} />
        <TextInput placeholder="Contenu" value={body} onChangeText={setBody} style={styles.input} />

        <TouchableOpacity style={styles.button} onPress={submitPost}>
          <Text style={styles.buttonText}>Ajouter un post (POST)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={() => setShowUsers(prev => !prev)}>
          <Text style={styles.secondaryButtonText}>
            {showUsers ? 'Voir les posts' : 'Voir les utilisateurs (GET)'}
          </Text>
        </TouchableOpacity>

        {message ? <Text style={styles.message}>{message}</Text> : null}

        {showUsers ? (
          <FlatList
            data={users}
            keyExtractor={item => `${item.id}`}
            renderItem={({ item }) => (
              <View style={styles.postCard}>
                <Text style={styles.postTitle}>{item.name}</Text>
                <Text style={styles.postBody}>{item.email}</Text>
                <Text style={styles.metaText}>{item.company?.name ?? 'Entreprise non renseignee'}</Text>
              </View>
            )}
          />
        ) : (
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
        )}

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
    marginBottom: 2,
  },
  subtitle: {
    color: '#475569',
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
  secondaryButton: {
    backgroundColor: '#0f766e',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 8,
  },
  secondaryButtonText: {
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
  metaText: {
    marginTop: 4,
    color: '#64748b',
    fontSize: 12,
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
