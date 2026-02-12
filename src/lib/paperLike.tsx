import React from 'react';
import { ActivityIndicator, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

export function PaperCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      {children}
    </View>
  );
}

export function PaperButton({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
}

export function PaperChip({ text }: { text: string }) {
  return (
    <View style={styles.chip}>
      <Text style={styles.chipText}>{text}</Text>
    </View>
  );
}

export function PaperSwitch({ value, onChange }: { value: boolean; onChange: (value: boolean) => void }) {
  return <Switch value={value} onValueChange={onChange} />;
}

export function PaperLoader({ visible }: { visible: boolean }) {
  if (!visible) {
    return null;
  }

  return <ActivityIndicator size="small" color="#2563eb" />;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#dbe2ea',
    borderRadius: 12,
    padding: 14,
    marginTop: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#2563eb',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '700',
  },
  chip: {
    borderRadius: 20,
    backgroundColor: '#e0e7ff',
    alignSelf: 'flex-start',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 8,
  },
  chipText: {
    color: '#3730a3',
    fontWeight: '600',
  },
});
