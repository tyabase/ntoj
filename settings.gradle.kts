pluginManagement {
    plugins {
        id("org.jetbrains.kotlin.jvm") version "1.8.20"
    }
}

rootProject.name = "ntoj"

require(JavaVersion.current() >= JavaVersion.VERSION_17) {
    "You must use at least Java 17 to build the project, you're currently using ${System.getProperty("java.version")}"
}

include(":shared")
include(":server")

rootProject.children.forEach { it.configureBuildScriptName() }

fun ProjectDescriptor.configureBuildScriptName() {
    buildFileName = "${name}.gradle.kts"
    children.forEach { it.configureBuildScriptName() }
}
