import 'package:flutter/material.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import 'config/supabase_config.dart';
import 'new_decision_page.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  if (!SupabaseConfig.isValid) {
    runApp(const _ConfigErrorApp());
    return;
  }

  await Supabase.initialize(
    url: SupabaseConfig.url,
    anonKey: SupabaseConfig.anonKey,
  );

  runApp(const DecisioApp());
}

class _ConfigErrorApp extends StatelessWidget {
  const _ConfigErrorApp();

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      home: Scaffold(
        body: Center(
          child: Text(
            'Configuration Supabase manquante.\n'
            'Lance l’app avec --dart-define.',
            textAlign: TextAlign.center,
          ),
        ),
      ),
    );
  }
}


final supabase = Supabase.instance.client;

class DecisioApp extends StatelessWidget {
  const DecisioApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Decisio',
      debugShowCheckedModeBanner: false,
      home: const AuthGate(),
    );
  }
}

class AuthGate extends StatelessWidget {
  const AuthGate({super.key});

  @override
  Widget build(BuildContext context) {
    return StreamBuilder<AuthState>(
      stream: supabase.auth.onAuthStateChange,
      builder: (context, snapshot) {
        final session = supabase.auth.currentSession;
        if (session == null) return const LoginPage();
        return const HomePage();
      },
    );
  }
}


class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final _emailController = TextEditingController();
  final _codeController = TextEditingController();

  bool _loading = false;
  String? _message;

  @override
  void dispose() {
    _emailController.dispose();
    _codeController.dispose();
    super.dispose();
  }

  Future<void> _sendOtp() async {
    final email = _emailController.text.trim();
    if (email.isEmpty) {
      setState(() => _message = "Entre un email valide.");
      return;
    }

    setState(() {
      _loading = true;
      _message = null;
    });

    try {
      await supabase.auth.signInWithOtp(email: email);
      setState(() => _message = "Code envoyé. Vérifie ton email.");
    } on AuthException catch (e) {
      setState(() => _message = "Erreur auth : ${e.message}");
    } catch (e) {
      setState(() => _message = "Erreur : $e");
    } finally {
      setState(() => _loading = false);
    }
  }

  Future<void> _verifyCode() async {
    final email = _emailController.text.trim();
    final token = _codeController.text.trim();

    if (email.isEmpty || token.isEmpty) {
      setState(() => _message = "Entre l’email et le code.");
      return;
    }

    setState(() {
      _loading = true;
      _message = null;
    });

    try {
      await supabase.auth.verifyOTP(
        email: email,
        token: token,
        type: OtpType.magiclink,
      );
    } on AuthException catch (e) {
      setState(() => _message = "Code invalide : ${e.message}");
    } catch (e) {
      setState(() => _message = "Erreur : $e");
    } finally {
      setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Connexion')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            TextField(
              controller: _emailController,
              decoration: const InputDecoration(labelText: 'Email'),
            ),
            const SizedBox(height: 12),
            ElevatedButton(
              onPressed: _loading ? null : _sendOtp,
              child: Text(_loading ? 'Envoi…' : 'Envoyer le code'),
            ),
            const SizedBox(height: 24),
            TextField(
              controller: _codeController,
              decoration: const InputDecoration(labelText: 'Code reçu par email'),
            ),
            const SizedBox(height: 12),
            ElevatedButton(
              onPressed: _loading ? null : _verifyCode,
              child: Text(_loading ? 'Vérif…' : 'Vérifier le code'),
            ),
            if (_message != null) ...[
              const SizedBox(height: 12),
              Text(_message!),
            ],
          ],
        ),
      ),
    );
  }
}


class HomePage extends StatelessWidget {
  const HomePage({super.key});

  Future<void> _signOut() async {
    await supabase.auth.signOut();
  }

  @override
  Widget build(BuildContext context) {
    final email = supabase.auth.currentUser?.email ?? '';

    return Scaffold(
      appBar: AppBar(
        title: const Text('Decisio'),
        actions: [
          IconButton(onPressed: _signOut, icon: const Icon(Icons.logout)),
        ],
      ),
      body: Center(child: Text('Connecté : $email')),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.of(context).push(
            MaterialPageRoute(builder: (_) => const NewDecisionPage()),
          );
        },
        child: const Icon(Icons.add),
      ),
    );
  }
}

