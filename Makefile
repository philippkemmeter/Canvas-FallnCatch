.PHONY: all

all:
	cd js && ./compile_all
clean:
	rm js/all.js
	rm js/GE/ge_all.js
	rm js/MathExt/math_ext_all.js
	rm js/FallnCatch/game_all.js
