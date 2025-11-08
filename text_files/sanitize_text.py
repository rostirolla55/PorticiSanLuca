import sys
import os
import io

# Funzione di debug: stampa la stringa in formato esadecimale (su stderr)
def debug_hex_output(text):
    """Stampa la rappresentazione esadecimale della stringa (utile per il debug)."""
    # Codifica in UTF-8
    encoded_text = text.encode('utf-8')
    # Converte i byte in stringa esadecimale
    hex_string = encoded_text.hex()
    
    # Stampa su sys.stderr per non interferire con la redirezione >
    print("\n--- DEBUG: STRINGA SANITIZZATA IN ESADECIMALE (UTF-8) ---", file=sys.stderr)
    print(hex_string, file=sys.stderr)
    print("Codici rilevanti: \" (22), \ (5c)", file=sys.stderr)
    print("---------------------------------------------------------", file=sys.stderr)
    
def sanitize_for_json(input_filepath):
    """
    Legge un file, esegue l'escape dei doppi apici e rimuove gli a capo.
    """
    if not os.path.exists(input_filepath):
        print(f"ERRORE: File non trovato: {input_filepath}", file=sys.stderr) 
        return ""

    try:
        # Usiamo io.open per specificare esplicitamente la codifica UTF-8
        with io.open(input_filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # 1. ESCAPE CORRETTO DEI DOPPI APICI: 
        # Usiamo quattro backslash per ottenere il backslash letterale \ seguito da " nella stringa finale.
        # Python legge '\\\\"' come '\', poi 'cmd' legge '\' come '\'.
        sanitized_content = content.replace('"', '\\\\"') 
        
        # 2. Eliminazione di tutti i caratteri di a capo per una singola riga
        sanitized_content = sanitized_content.replace('\r\n', ' ')
        sanitized_content = sanitized_content.replace('\n', ' ')
        
        # Eliminiamo eventuali spazi multipli consecutivi e rimuoviamo gli spazi all'inizio/fine
        sanitized_content = " ".join(sanitized_content.split()).strip()
        
        # CHIAMATA DI DEBUG 
        debug_hex_output(sanitized_content) 
        
        return sanitized_content

    except Exception as e:
        print(f"Si è verificato un errore durante l'elaborazione del file: {e}", file=sys.stderr)
        return ""

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Uso: python sanitize_text.py <percorso_del_file_html>", file=sys.stderr)
        sys.exit(1)

    input_file = sys.argv[1]
    result = sanitize_for_json(input_file)
    
    # Stampa solo il risultato finale su stdout per la redirezione nel file batch
    print(result)