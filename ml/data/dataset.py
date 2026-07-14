import nibabel as nib
from pathlib import Path

from fontTools.varLib.avar import __main__
from torch.utils.data import Dataset, DataLoader
import torch
import numpy as np
import matplotlib.pyplot as plt

class BrainTumorDataset(Dataset):
    def __init__(self, root):
        self.root = Path(root)

        self.patients = sorted([
            p for p in self.root.iterdir()
            if p.is_dir()
        ])

        self.samples = []

        for patient in self.patients:
            flair = next(patient.glob("*flair.nii.gz"))
            volume = nib.load(flair)
            depth = volume.shape[2]

            for slice_idx in range(depth):
                self.samples.append((patient, slice_idx))

    def __len__(self):
        return len(self.samples)

    def __getitem__(self, idx):
        patient, slice_idx = self.samples[idx]

        flair = nib.load(
            next(patient.glob("*flair.nii.gz"))
        ).get_fdata()

        mask = nib.load(
            next(patient.glob("*ManuallyCorrected.nii.gz"))
        ).get_fdata()

        image = flair[:, :, slice_idx]
        target = mask[:, :, slice_idx]

        image = image.astype(np.float32)
        target = target.astype(np.int64)

        image = torch.from_numpy(image).unsqueeze(0)
        target = torch.from_numpy(target)

        return image, target


dataset = BrainTumorDataset("ml/data/Pre-operative_TCGA_GBM_NIfTI_and_Segmentations")


train_loader = DataLoader(dataset, batch_size=8, shuffle=True)

