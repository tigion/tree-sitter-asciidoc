#include "tree_sitter/parser.h"
#include <stdbool.h>

enum TokenType { LISTING_BLOCK_CONTENT };

// Define the states of the state machine.
typedef enum {
  STATE_NORMAL,
  STATE_DASH1,
  STATE_DASH2,
  STATE_DASH3,
  STATE_DASH4
} State;

void *tree_sitter_asciidoc_external_scanner_create() {
  return NULL;
}

void tree_sitter_asciidoc_external_scanner_destroy(void *payload) {}

unsigned tree_sitter_asciidoc_external_scanner_serialize(void *payload,
                                                         char *buffer) {
  return 0;
}

void tree_sitter_asciidoc_external_scanner_deserialize(void *payload,
                                                       const char *buffer,
                                                       unsigned length) {}

bool tree_sitter_asciidoc_external_scanner_scan(void *payload, TSLexer *lexer,
                                                const bool *valid_symbols) {
  if (!valid_symbols[LISTING_BLOCK_CONTENT])
    return false;

  lexer->result_symbol = LISTING_BLOCK_CONTENT;

  // Initialize the state machine.
  State state = STATE_NORMAL;

  // Scan through the characters until we find a fence delimiter
  // or reach the end of the file.
  while (true) {
    if (lexer->eof(lexer))
      return false; // End of file reached.

    // Get the current character from the lexer.
    char current_character = lexer->lookahead;

    // Update the state machine based on the current character.
    switch (state) {
      case STATE_NORMAL:
        if (current_character == '-')
          state = STATE_DASH1;
        break;

      case STATE_DASH1:
        state = (current_character == '-') ? STATE_DASH2 : STATE_NORMAL;
        break;

      case STATE_DASH2:
        state = (current_character == '-') ? STATE_DASH3 : STATE_NORMAL;
        break;

      case STATE_DASH3:
        state = (current_character == '-') ? STATE_DASH4 : STATE_NORMAL;
        break;

      case STATE_DASH4:
        if (current_character == '\n') {
          return true; // Fence delimiter `----\n` found.
        }
        state = STATE_NORMAL;
        break;
    }

    // Move the lexer to the next character.
    lexer->advance(lexer, false);

    // Mark the end of the token after each character
    // if we are in the normal state.
    if (state == STATE_NORMAL)
      lexer->mark_end(lexer);
  }
}
