dirs = js/GE js/MathExt js/FallnCatch js

scripts=for dir in $(dirs); do\
			(cd $$dir; make $$target)|| exit 1;\
		done

all :
	$(scripts)

clean :
	target=clean; $(scripts)
