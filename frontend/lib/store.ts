import * as SecureStore from "expo-secure-store";

export async function storeToken(token: string) {
  try {
    await SecureStore.setItemAsync("token", token);
  } catch (error) {
    console.error("Error storing token:", error);
  }
}

export async function getToken() {
  return await SecureStore.getItemAsync("token");
}

export async function removeToken() {
  return await SecureStore.deleteItemAsync("token");
}
