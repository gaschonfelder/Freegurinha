/**
 * FREEGURINHA — services/auth.js
 * Autenticação real via Supabase Auth
 */

import { supabase } from './supabase.js';

export async function loginWithEmail(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);
  return data.user;
}

export async function registerWithEmail(email, password, name) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: name } },
  });
  if (error) throw new Error(error.message);
  return {
    user: data.user,
    needsConfirmation: !!(data.user && !data.user.email_confirmed_at),
  };
}

export async function loginWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: window.location.origin + '/pages/app.html' },
  });
  if (error) throw new Error(error.message);
}

export async function logout() {
  await supabase.auth.signOut();
  window.location.href = '../pages/login.html';
}

export async function getCurrentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function getSession() {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
}

export function onAuthChange(callback) {
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange(callback);
  return subscription;
}

export async function getProfile(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function updateProfile(userId, updates) {
  const { data, error } = await supabase
    .from('profiles')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', userId)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function linkPhone(userId, phone) {
  return updateProfile(userId, { phone });
}

export async function requireAuth(loginUrl = '../pages/login.html') {
  const user = await getCurrentUser();
  if (!user) {
    window.location.href = loginUrl;
    throw new Error('Nao autenticado');
  }
  return user;
}

export async function redirectIfLoggedIn(appUrl = '../pages/app.html') {
  const user = await getCurrentUser();
  if (user) window.location.href = appUrl;
}
