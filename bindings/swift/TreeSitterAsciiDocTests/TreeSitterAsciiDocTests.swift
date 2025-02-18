import XCTest
import SwiftTreeSitter
import TreeSitterAsciiDoc

final class TreeSitterAsciiDocTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_asciidoc())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading AsciiDoc grammar")
    }
}
