# Garden Hub

Interaktywny planer ogrodu: lista zadań, kalendarz wysiewów i osobista galeria zdjęć.

## Uruchomienie lokalne

Otwórz `index.html` bezpośrednio w przeglądarce lub uruchom prosty serwer:

```bash
python -m http.server 8000
```

Następnie wejdź na `http://localhost:8000`.

## GitHub Pages

1. Wgraj pliki projektu do gałęzi `main` w repozytorium GitHub.
2. Otwórz **Settings → Pages**.
3. W sekcji **Build and deployment** wybierz **Deploy from a branch**.
4. Wybierz gałąź `main` i folder `/ (root)`, a następnie kliknij **Save**.

Dane zadań, wysiewów i zdjęć są zapisywane lokalnie w przeglądarce (localStorage).
