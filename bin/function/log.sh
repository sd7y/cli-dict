


function log::info() {
  echo -e "${COLOR_BLUE}[~~INFO]${COLOR_NONE} $@"
}

function log::warn() {
  echo -e "${COLOR_YELLOW}[~~WARN]${COLOR_NONE} $@"
}

function log::error() {
  echo -e "${COLOR_RED}[~ERROR]${COLOR_NONE} $@"
}

function log::debug() {
  echo -e "${COLOR_GRAY}[~DEBUG]${COLOR_NONE} $@"
}

function log::success() {
  echo -e "${COLOR_GREEN}[SUCCESS]${COLOR_NONE} $@"
}