//
//  RNOptionAlert.m
//  sdbao
//
//  Created by ygj on 2017/11/1.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "RNOptionAlert.h"
#import "UIAlertController+LabelConfig.h"
#import <React/RCTConvert.h>
#import <React/RCTUtils.h>

@implementation RNOptionAlert
{
  NSHashTable *_alertControllers;
}

RCT_EXPORT_MODULE(OptionAlert)


- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

- (void)invalidate
{
  for (UIAlertController *alertController in _alertControllers) {
    [alertController.presentingViewController dismissViewControllerAnimated:YES completion:nil];
  }
}

RCT_EXPORT_METHOD(alertWithArgs:(NSDictionary *)args
                  callback:(RCTResponseSenderBlock)callback)
{
  NSString *title = [RCTConvert NSString:args[@"title"]];
  NSString *message = [RCTConvert NSString:args[@"message"]];
  NSArray<NSDictionary *> *buttons = [RCTConvert NSDictionaryArray:args[@"buttons"]];
  NSString *defaultValue = [RCTConvert NSString:args[@"defaultValue"]];
  NSString *cancelButtonKey = [RCTConvert NSString:args[@"cancelButtonKey"]];
  NSString *destructiveButtonKey = [RCTConvert NSString:args[@"destructiveButtonKey"]];
  UIKeyboardType keyboardType = [RCTConvert UIKeyboardType:args[@"keyboardType"]];
  
  if (!title && !message) {
    RCTLogError(@"Must specify either an alert title, or message, or both");
    return;
  }
  
  if (buttons.count == 0) {
    buttons = @[@{@"0": RCTUIKitLocalizedString(@"OK")}];
    cancelButtonKey = @"0";
  }
  
  UIViewController *presentingController = RCTPresentedViewController();
  if (presentingController == nil) {
    RCTLogError(@"Tried to display alert view but there is no application window. args: %@", args);
    return;
  }
  
  UIAlertController *alertController = [UIAlertController
                                        alertControllerWithTitle:title
                                        message:nil preferredStyle:UIAlertControllerStyleAlert];
  alertController.message = message;
  alertController.yf_messageLabel.textAlignment = NSTextAlignmentLeft;
  
  for (NSDictionary<NSString *, id> *button in buttons) {
    if (button.count != 1) {
      RCTLogError(@"Button definitions should have exactly one key.");
    }
    NSString *buttonKey = button.allKeys.firstObject;
    NSString *buttonTitle = [RCTConvert NSString:button[buttonKey]];
    UIAlertActionStyle buttonStyle = UIAlertActionStyleDefault;
    if ([buttonKey isEqualToString:cancelButtonKey]) {
      buttonStyle = UIAlertActionStyleCancel;
    } else if ([buttonKey isEqualToString:destructiveButtonKey]) {
      buttonStyle = UIAlertActionStyleDestructive;
    }
    __weak UIAlertController *weakAlertController = alertController;
    [alertController addAction: [UIAlertAction actionWithTitle:buttonTitle style:buttonStyle handler:^(__unused UIAlertAction *action) {
      callback(@[buttonKey]);
    }]];
  }
  
  if (!_alertControllers) {
    _alertControllers = [NSHashTable weakObjectsHashTable];
  }
  [_alertControllers addObject:alertController];
  
  [presentingController presentViewController:alertController animated:YES completion:nil];
}


@end
