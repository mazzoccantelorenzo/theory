PNPM_HOME := $(HOME)/.local/share/pnpm
export PATH := $(PNPM_HOME)/bin:$(PATH)

.PHONY: dev build start typecheck install

dev:
	pnpm run dev

build:
	pnpm run build

start:
	pnpm run start

typecheck:
	pnpm run typecheck

install:
	pnpm install
