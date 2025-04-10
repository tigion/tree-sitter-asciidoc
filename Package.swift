// swift-tools-version:5.3
import PackageDescription

let package = Package(
    name: "TreeSitterAsciiDoc",
    products: [
        .library(name: "TreeSitterAsciiDoc", targets: ["TreeSitterAsciiDoc"]),
    ],
    dependencies: [
        .package(url: "https://github.com/ChimeHQ/SwiftTreeSitter", from: "0.8.0"),
    ],
    targets: [
        .target(
            name: "TreeSitterAsciiDoc",
            dependencies: [],
            path: ".",
            sources: [
                "src/parser.c",
                // NOTE: if your language has an external scanner, add it here.
            ],
            resources: [
                .copy("queries")
            ],
            publicHeadersPath: "bindings/swift",
            cSettings: [.headerSearchPath("src")]
        ),
        .testTarget(
            name: "TreeSitterAsciiDocTests",
            dependencies: [
                "SwiftTreeSitter",
                "TreeSitterAsciiDoc",
            ],
            path: "bindings/swift/TreeSitterAsciiDocTests"
        )
    ],
    cLanguageStandard: .c11
)
