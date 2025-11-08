import sys
import os
import io

def sanitize_for_json(input_filepath):
    """
    Converte apici tipografici (smart quotes) in apici standard, 
    esegue l'escape dei doppi apici e rimuove gli a capo.
    """
    if not os.path.exists(input_filepath):
        print(f"ERRORE: File non trovato: {input_filepath}", file=sys.stderr) 
        return ""

    try:
        # Leggiamo esplicitamente come UTF-8
        with io.open(input_filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # 0. CONVERSIONE IN APICI STANDARD (")
        # I codici esadecimali 93 e 94 si riferiscono probabilmente ai caratteri Unicode \u201c e \u201d 
        # (o alle loro versioni in Windows-1252 se la codifica e' sbagliata, ma li trattiamo come Unicode)
        
        # Sostituisce l'apice aperto (“) e chiuso (”) con l'apice standard (")
        content = content.replace('“', '"') 
        content = content.replace('”', '"')
        
        # Aggiungo anche l'apice singolo tipografico (' e ')
        content = content.replace('‘', "'") 
        content = content.replace('’', "'") 


        # 1. ESCAPE DEI DOPPI APICI STANDARD (")
        # La forma più robusta per ottenere \" nel file di output
        sanitized_content = content.replace('"', '\\"') 
        
        # 2. Eliminazione di tutti i caratteri di a capo per una singola riga
        sanitized_content = sanitized_content.replace('\r\n', ' ')
        sanitized_content = sanitized_content.replace('\n', ' ')
        
        # Pulizia finale degli spazi
        sanitized_content = " ".join(sanitized_content.split()).strip()
        
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
    
    # Stampa il risultato finale su stdout per la redirezione nel file batch
    print(result)