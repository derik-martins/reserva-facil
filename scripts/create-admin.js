import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';

config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function createAdminUser() {
  try {
    // 1. Criar o usuário
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: 'derik@derikmartins.com.br',
      password: 'admin123',
    });

    if (authError) throw authError;

    // 2. Criar o perfil do usuário
    const { error: createProfileError } = await supabase
      .from('profiles')
      .insert([
        {
          id: authData.user.id,
          name: 'Admin',
          is_admin: true
        }
      ]);

    if (createProfileError) throw createProfileError;

    console.log('Usuário admin criado com sucesso!');
    console.log('Email:', 'derik@derikmartins.com.br');
    console.log('Senha:', 'admin123');
  } catch (error) {
    console.error('Erro ao criar usuário admin:', error.message);
  } finally {
    process.exit();
  }
}

createAdminUser(); 