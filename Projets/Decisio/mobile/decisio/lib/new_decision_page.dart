import 'package:flutter/material.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

final supabase = Supabase.instance.client;

class NewDecisionPage extends StatefulWidget {
  const NewDecisionPage({super.key});

  @override
  State<NewDecisionPage> createState() => _NewDecisionPageState();
}

class _NewDecisionPageState extends State<NewDecisionPage> {
  final _questionController = TextEditingController();
  final _optionAController = TextEditingController();
  final _optionBController = TextEditingController();

  bool _loading = false;
  String? _error;

  @override
  void dispose() {
    _questionController.dispose();
    _optionAController.dispose();
    _optionBController.dispose();
    super.dispose();
  }

  Future<void> _saveDecision() async {
    final question = _questionController.text.trim();
    final optionA = _optionAController.text.trim();
    final optionB = _optionBController.text.trim();

    if (question.isEmpty || optionA.isEmpty || optionB.isEmpty) {
      setState(() => _error = "Tous les champs sont obligatoires.");
      return;
    }

    setState(() {
      _loading = true;
      _error = null;
    });

    try {
      await supabase.from('decisions').insert({
        'question': question,
        'options': [optionA, optionB],
      });

      if (!mounted) return;
      Navigator.of(context).pop();
    } catch (e) {
      setState(() => _error = e.toString());
    } finally {
      setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Nouvelle décision')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            TextField(
              controller: _questionController,
              decoration: const InputDecoration(
                labelText: 'Quelle décision dois-je prendre ?',
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 12),
            TextField(
              controller: _optionAController,
              decoration: const InputDecoration(
                labelText: 'Option A',
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 12),
            TextField(
              controller: _optionBController,
              decoration: const InputDecoration(
                labelText: 'Option B',
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 16),
            if (_error != null) ...[
              Text(_error!, style: const TextStyle(color: Colors.red)),
              const SizedBox(height: 12),
            ],
            ElevatedButton(
              onPressed: _loading ? null : _saveDecision,
              child: Text(_loading ? 'Enregistrement…' : 'Enregistrer'),
            ),
          ],
        ),
      ),
    );
  }
}