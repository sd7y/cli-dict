import { Word } from "../entities/Word.ts";
import { exists } from "https://deno.land/std@v0.52.0/fs/exists.ts";

export async function speak(word: Word) {
    let url = "https://fanyi.baidu.com/gettts?lan=uk&spd=3&source=web&text=" + word.text;

    let mp3Path = "/tmp/my_dict_" + word.text + ".mp3";

    if (!await exists(mp3Path)) {
        await run([ "curl", url, "-o", mp3Path ]);
    }

    while (true) {
        await run([ "mpg123", mp3Path ]);
    }
}

async function run(cmd: string[]) {
    const p = Deno.run({
        cmd: cmd,
        stdout: "piped",
        stderr: "piped",
    });

    const { code } = await p.status();

    if (code === 0) {
        const rawOutput = await p.output();
        await Deno.stdout.write(rawOutput);
    } else {
        const rawError = await p.stderrOutput();
        const errorString = new TextDecoder().decode(rawError);
        console.log(errorString);
    }
}
