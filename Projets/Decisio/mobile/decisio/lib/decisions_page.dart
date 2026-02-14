import 'package:flutter/material.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

final supabase = Supabase.instance.client;

class DecisionsPage extends StatefulWidget {
  const DecisionsPage({super.key});

  @override
  State<DecisionsPage> createState() => _DecisionsPageState();
}

class _DecisionsPageState extends State<DecisionsPage> {
  late Future<List<Map<String, dynamic>>> _future;

  @override
  void initState() {
    super.initState();
    _future = _fetch();
  }

  Future<List<Map<String, dynamic>>> _fetch() async {
    final data = await supabase
        .from('decisions')
        .select('id, question, options, chosen_option, created_at')
        .order('created_at', ascending: false);

    // supabase_flutter retourne souvent List<dynamic>
    return (data as List).cast<Map<String, dynamic>>();
  }

  Future<void> _refresh() async {
    setState(() {
      _future = _fetch();
    });
    await _future;
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<List<Map<String, dynamic>>>(
      future: _future,
      builder: (context, snapshot) {
        final isLoading = snapshot.connectionState == ConnectionState.waiting;

        if (isLoading) {
          return const Center(child: CircularProgressIndicator());
        }

        if (snapshot.hasError) {
          return Padding(
            padding: const EdgeInsets.all(16),
            child: Center(
              child: Text(
                "Erreur chargement :\n${snapshot.error}",
                textAlign: TextAlign.center,
              ),
            ),
          );
        }

        final items = snapshot.data ?? const <Map<String, dynamic>>[];

        if (items.isEmpty) {
          return RefreshIndicator(
            onRefresh: _refresh,
            child: ListView(
              padding: const EdgeInsets.all(16),
              children: const [
                SizedBox(height: 120),
                Center(
                  child: Text(
                    "Aucune décision pour l’instant.\nAppuie sur + pour en créer une.",
                    textAlign: TextAlign.center,
                  ),
                ),
              ],
            ),
          );
        }

        return RefreshIndicator(
          onRefresh: _refresh,
          child: ListView.separated(
            padding: const EdgeInsets.all(12),
            itemCount: items.length,
            separatorBuilder: (_, __) => const SizedBox(height: 8),
            itemBuilder: (context, i) {
              final d = items[i];
              final question = (d['question'] ?? '').toString();
              final createdAt = (d['created_at'] ?? '').toString();

              return Card(
                child: ListTile(
                  title: Text(question, maxLines: 2, overflow: TextOverflow.ellipsis),
                  subtitle: Text(createdAt),
                ),
              );
            },
          ),
        );
      },
    );
  }
}
