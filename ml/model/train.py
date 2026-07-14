import torch

def train(num_epochs, model, train_loader, device, optim, criterion):
    for epoch in range(num_epochs):
        total_loss = 0

        model.train()

        for images, masks in train_loader:
            images, masks = images.to(device), masks.to(device)

            optim.zero_grad()

            outputs = model(images)
            loss = criterion(outputs, masks)
            loss.backward()

            optim.step()

            total_loss += loss.item()

        print(f"Epoch: {epoch+1}/{num_epochs}, Total loss: {total_loss/len(train_loader)}")

    torch.save(model.state_dict(), "tumor_segment_model.pth")

    model.eval()

    dummy_input = torch.randn(1, 1, 256, 256, device=device)

    torch.onnx.export(
        model,
        dummy_input,
        "tumor_segment_model.onnx",
        input_names=["input"],
        output_names=["mask"],
        dynamic_axes={
            "input": {0: "batch_size"},
            "mask": {0: "batch_size"},
        },
        opset_version=17
    )