#include "tree_sitter/parser.h"
#include <stdbool.h>

// The token types must be declared in the same order that the external tokens
// are listed in the grammar's `externals` rule, because tree-sitter indexes
// `valid_symbols` by that order.
enum TokenType { LISTING_BLOCK_CONTENT, LITERAL_BLOCK_CONTENT };

// Define the states of the state machine.
//
// The states are fence-agnostic: they track a run of four identical fence
// characters (`-` for listing blocks, `.` for literal blocks) followed by a
// newline. The actual fence character is recorded in `fence_character`.
typedef enum {
  STATE_NORMAL,
  STATE_FENCE1,
  STATE_FENCE2,
  STATE_FENCE3,
  STATE_FENCE4
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
  // Determine which fence character to look for based on the valid symbols.
  char fence_char;
  if (valid_symbols[LISTING_BLOCK_CONTENT]) {
    fence_char = '-';
    lexer->result_symbol = LISTING_BLOCK_CONTENT;
  } else if (valid_symbols[LITERAL_BLOCK_CONTENT]) {
    fence_char = '.';
    lexer->result_symbol = LITERAL_BLOCK_CONTENT;
  } else {
    return false;
  }

  // Initialize the state machine.
  State state = STATE_NORMAL;

  // Scan through the characters until we find a fence delimiter
  // or reach the end of the file.
  while (true) {
    if (lexer->eof(lexer))
      return false; // End of file reached.

    // Get the current character from the lexer.
    char current_char = lexer->lookahead;

    // Update the state machine based on the current character.
    switch (state) {
      case STATE_NORMAL:
        if (current_char == fence_char)
          state = STATE_FENCE1;
        break;

      case STATE_FENCE1:
        state = (current_char == fence_char) ? STATE_FENCE2 : STATE_NORMAL;
        break;

      case STATE_FENCE2:
        state = (current_char == fence_char) ? STATE_FENCE3 : STATE_NORMAL;
        break;

      case STATE_FENCE3:
        state = (current_char == fence_char) ? STATE_FENCE4 : STATE_NORMAL;
        break;

      case STATE_FENCE4:
        if (current_char == '\n') {
          return true; // Fence delimiter `----\n` or `....\n` found.
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
