include "./node_modules/circomlib/circuits/mimcsponge.circom";

// Computes MiMC([left, right])
template HashLeftRight() {
    signal input left;
    signal input right;
    signal output hash;

    component hasher = MiMCSponge(2, 220, 1);
    hasher.ins[0] <== left;
    hasher.ins[1] <== right;
    hasher.k <== 0;
    hash <== hasher.outs[0];
}

template simple() {
	signal input left;
	signal input right;

	signal square;

	square <== right * right;

	left === square * right;
}

// component main = HashLeftRight();
component main = simple();