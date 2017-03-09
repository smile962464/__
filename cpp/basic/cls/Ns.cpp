#if !defined(OS)
#define OS_NOT_DEFINED
#endif

void globalFunc();

namespace foo {
    /**
    ...Foo...
    */
    class Foo {
    public:
        Foo();

        ~Foo();

        virtual Foo *getSelf() { return Foo::getSelf(); }

    private:
        void innerFunc();

        int var;
    };
}

struct FooPOD {
    #ifdef OS_NOT_DEFINED
    #define OS "unknown"
    #endif
    #define FooPOD_OS OS
    int i;
};

struct FooC {
private:
    int i;
};

extern int a;

static int innerFunc();

int a = innerFunc();

int innerFunc() { return 5; }

void foo::Foo::innerFunc() {
    label1:
    int continuation = 0xCD
                       + 0xFD + 0xBAADF00D + 0xDEADBEEF;
    auto la = [](int i1, int i2) -> bool mutable {
        label2:
        return i1 < i2;
    }(1, 2);
}
