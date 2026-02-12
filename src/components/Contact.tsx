import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type ContactProps = {
  name: string;
  phone: string;
  onPress: () => void;
};

function Contact({ name, phone, onPress }: ContactProps) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View>
        <Text style={{ fontSize: 18, fontWeight: '700', color: '#1f2937' }}>{name}</Text>
        <Text style={{ fontSize: 15, color: '#4b5563', marginTop: 4 }}>{phone}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    backgroundColor: '#ffffff',
  },
});

export default Contact;
